import { useEffect, useState } from "react";

export const useNews = (page) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [endCursor, setEndCursor] = useState(null); // Store cursor

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);

            try {
                // If it's the first page, don't use endCursor
                const apiUrl = endCursor
                    ? `http://localhost:8000/api/news/top-headlines?cursor=${endCursor}`
                    : `http://localhost:8000/api/news/top-headlines?page=${page}`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response:", data);

                const extractedNews = data?.data?.data?.news?.edges?.map(edge => edge.node) || [];
                setNews(extractedNews);
                
                // Store new cursor for next page
                setEndCursor(data?.data?.data?.news?.pageInfo?.endCursor || null);
                
                // Check if more pages exist
                setHasNextPage(data?.data?.data?.news?.pageInfo?.hasNextPage || false);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [page]); // Re-run when page changes

    return { news, loading, error, hasNextPage, endCursor };
};
