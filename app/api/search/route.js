export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return Response.json({ error: "Query parameter is required" }, { status: 400 });
    }

      const API_KEY = process.env.SERP_API_KEY;
      const API_URL = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${API_KEY}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return Response.json(data, { status: 200 });

}