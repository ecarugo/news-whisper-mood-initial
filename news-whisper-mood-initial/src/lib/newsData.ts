export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  date: string;
  keywords: string[];
}

export interface TrendData {
  date: string;
  count: number;
}

export interface SentimentData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

// 샘플 뉴스 데이터
const sampleNews: NewsArticle[] = [
  {
    id: "1",
    title: "AI 기술 발전이 산업 전반에 영향",
    content: "인공지능 기술의 발전으로 다양한 산업 분야에서 혁신이 일어나고 있습니다. AI는 긍정적인 변화를 가져오고 있습니다.",
    date: "2025-01-01",
    keywords: ["AI", "기술", "혁신"],
  },
  {
    id: "2",
    title: "AI 윤리 문제 대두",
    content: "AI 기술의 급속한 발전과 함께 윤리적 문제가 제기되고 있습니다. 부정적인 측면도 고려해야 합니다.",
    date: "2025-01-02",
    keywords: ["AI", "윤리", "문제"],
  },
  {
    id: "3",
    title: "클라우드 컴퓨팅 시장 성장세",
    content: "클라우드 시장이 빠르게 성장하고 있으며, 기업들의 도입이 증가하고 있습니다. 긍정적인 전망입니다.",
    date: "2025-01-03",
    keywords: ["클라우드", "시장", "성장"],
  },
  {
    id: "4",
    title: "AI 일자리 대체 우려",
    content: "AI가 많은 일자리를 대체할 것이라는 우려가 커지고 있습니다. 부정적인 영향에 대한 대책이 필요합니다.",
    date: "2025-01-04",
    keywords: ["AI", "일자리", "대체"],
  },
  {
    id: "5",
    title: "AI 의료 진단 시스템 도입",
    content: "AI 기반 의료 진단 시스템이 병원에 도입되어 정확도가 크게 향상되었습니다. 매우 긍정적인 결과입니다.",
    date: "2025-01-05",
    keywords: ["AI", "의료", "진단"],
  },
  {
    id: "6",
    title: "클라우드 보안 취약점 발견",
    content: "클라우드 서비스의 보안 취약점이 발견되어 우려가 제기되고 있습니다. 부정적인 뉴스입니다.",
    date: "2025-01-06",
    keywords: ["클라우드", "보안", "취약점"],
  },
  {
    id: "7",
    title: "AI 교육 시스템 효과 입증",
    content: "AI 기반 교육 시스템이 학습 효율을 크게 높이는 것으로 나타났습니다. 긍정적인 교육 혁신입니다.",
    date: "2025-01-07",
    keywords: ["AI", "교육", "혁신"],
  },
  {
    id: "8",
    title: "클라우드 비용 증가 문제",
    content: "클라우드 사용 비용이 예상보다 크게 증가하여 기업들의 부담이 커지고 있습니다. 부정적입니다.",
    date: "2025-01-08",
    keywords: ["클라우드", "비용", "증가"],
  },
  {
    id: "9",
    title: "AI 스타트업 투자 활발",
    content: "AI 스타트업에 대한 투자가 활발히 이루어지고 있으며, 시장 전망이 밝습니다. 긍정적인 소식입니다.",
    date: "2025-01-09",
    keywords: ["AI", "스타트업", "투자"],
  },
  {
    id: "10",
    title: "클라우드 서비스 안정성 개선",
    content: "주요 클라우드 서비스의 안정성이 크게 개선되었습니다. 긍정적인 발전입니다.",
    date: "2025-01-10",
    keywords: ["클라우드", "안정성", "개선"],
  },
];

// 감성 분석 (간단한 키워드 기반)
function analyzeSentiment(content: string): "positive" | "negative" | "neutral" {
  const positiveWords = ["긍정", "발전", "성장", "개선", "혁신", "효과", "향상", "밝습니다"];
  const negativeWords = ["부정", "문제", "우려", "취약점", "대체", "증가"];

  const lowerContent = content.toLowerCase();
  const hasPositive = positiveWords.some((word) => lowerContent.includes(word));
  const hasNegative = negativeWords.some((word) => lowerContent.includes(word));

  if (hasPositive && !hasNegative) return "positive";
  if (hasNegative && !hasPositive) return "negative";
  return "neutral";
}

const API_URL = "https://zyozbxdhdprlnnvuusyg.supabase.co/functions/v1/news-trends";

export async function getTrendData(keyword: string): Promise<TrendData[]> {
  try {
    const response = await fetch(`${API_URL}?keywords=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
      throw new Error("API 호출 실패");
    }
    const data = await response.json();
    
    // API 응답을 TrendData 형식으로 변환
    if (data.trend_data && Array.isArray(data.trend_data)) {
      return data.trend_data.map((item: any) => ({
        date: item.date,
        count: item.count || 0,
      }));
    }
    
    return [];
  } catch (error) {
    console.error("트렌드 데이터 조회 실패:", error);
    return [];
  }
}

export async function getSentimentData(keyword: string): Promise<SentimentData[]> {
  try {
    const response = await fetch(`${API_URL}?keywords=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
      throw new Error("API 호출 실패");
    }
    const data = await response.json();
    
    // API 응답을 SentimentData 형식으로 변환
    if (data.sentiment_data && Array.isArray(data.sentiment_data)) {
      return data.sentiment_data.map((item: any) => ({
        date: item.date,
        positive: item.positive || 0,
        negative: item.negative || 0,
        neutral: item.neutral || 0,
      }));
    }
    
    return [];
  } catch (error) {
    console.error("감성 데이터 조회 실패:", error);
    return [];
  }
}
