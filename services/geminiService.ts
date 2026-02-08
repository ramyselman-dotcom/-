
import { GoogleGenAI, Type } from "@google/genai";
import { Match, NewsItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * وظيفة لاختبار الاتصال والتأكد من صحة المفتاح
 */
export const testGeminiConnection = async (): Promise<{success: boolean, message: string}> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Say "OK"',
      config: { maxOutputTokens: 5 }
    });
    if (response.text) {
      return { success: true, message: "تم الاتصال بنجاح بسيرفرات Google Gemini" };
    }
    return { success: false, message: "استجابة غير متوقعة من السيرفر" };
  } catch (error: any) {
    console.error("Connection Test Error:", error);
    let errorMsg = "فشل الاتصال: تأكد من صحة المفتاح";
    if (error.message?.includes("API_KEY_INVALID")) {
      errorMsg = "خطأ: مفتاح API غير صالح أو غير صحيح";
    } else if (error.message?.includes("API_KEY_NOT_FOUND")) {
      errorMsg = "خطأ: لم يتم العثور على مفتاح API في إعدادات النظام";
    }
    return { success: false, message: errorMsg };
  }
};

export const analyzeMatch = async (match: Match): Promise<string> => {
  const systemInstruction = "أنت محلل رياضي مصري مخضرم. تحدث باللغة العربية بلهجة تجمع بين الفصحى البسيطة والروح الرياضية المصرية. ركز على التكتيكات الفنية وتوقعاتك بناءً على النتيجة الحالية. لا تزد عن 150 كلمة.";
  const prompt = `حلل المباراة: ${match.homeTeam.name} ضد ${match.awayTeam.name}، النتيجة ${match.homeScore}-${match.awayScore}. البطولة: ${match.league}. الحالة: ${match.status}.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction, temperature: 0.8 }
    });
    return response.text || "عذراً، المحلل مشغول الآن!";
  } catch (error) {
    return "حدث عطل في نظام التحليل.";
  }
};

export const fetchRealMatches = async (): Promise<Match[]> => {
  const prompt = `أعطني قائمة بمباريات اليوم الحقيقية في الدوري المصري ودوري أبطال أفريقيا والدوريات الكبرى. أعد البيانات بصيغة JSON حصراً. تأكد من جلب النتائج الحية الدقيقة.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              homeTeam: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, logo: { type: Type.STRING } }, required: ["name", "logo"] },
              awayTeam: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, logo: { type: Type.STRING } }, required: ["name", "logo"] },
              homeScore: { type: Type.NUMBER },
              awayScore: { type: Type.NUMBER },
              time: { type: Type.STRING },
              status: { type: Type.STRING },
              league: { type: Type.STRING },
              minute: { type: Type.NUMBER }
            },
            required: ["id", "homeTeam", "awayTeam", "homeScore", "awayScore", "time", "status", "league"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Fetch Matches Error:", error);
    throw error;
  }
};

export const fetchLiveNews = async (): Promise<NewsItem[]> => {
  const prompt = `ابحث في جوجل عن آخر 6 أخبار رياضية حقيقية وعاجلة الآن في مصر وإفريقيا وأوروبا. ركز على الصفقات والنتائج الهامة. أعدها بصيغة JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              image: { type: Type.STRING },
              date: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["id", "title", "image", "date", "category"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("News Fetch Error:", error);
    return [];
  }
};

export const globalSportsSearch = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `أجب على السؤال الرياضي التالي بدقة مستخدماً أحدث المعلومات المتاحة من جوجل: ${query}`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "أنت خبير رياضي عالمي. قدم إجابات دقيقة، موثقة، ومنظمة. استخدم نقاطاً إذا لزم الأمر. تجنب الإطالة غير المفيدة."
      }
    });
    return response.text || "لم أجد إجابة دقيقة لسؤالك في الوقت الحالي.";
  } catch (error) {
    return "نعتذر، حدث خطأ في الاتصال بخدمات جوجل السحابية. يرجى المحاولة لاحقاً.";
  }
};
