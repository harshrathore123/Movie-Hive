import React, { useState } from "react";
import { useNews } from "../../hooks/news/useNews";
import NewsPagination from "../news_pagination/NewsPagination";

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { news, loading, error, hasNextPage } = useNews(currentPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && (newPage === 1 || hasNextPage)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black p-4 pb-20">
      {/* Show Loading/Error State */}
      {loading && <div className="text-white text-center py-10">Loading news...</div>}
      {error && <div className="text-red-500 text-center py-10">Error: {error}</div>}

      {/* News List */}
      {!loading && !error && (
        <div className="w-full max-w-6xl">
          {news.length === 0 ? (
            <p className="text-gray-400 text-center">No news found.</p>
          ) : (
            news.map((item) => (
              <div key={item.id} className="bg-gray-900 text-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden mb-6">
                {/* News Image */}
                {item.image?.url && (
                  <div className="md:w-1/2 w-full">
                    <img src={item.image.url} alt="News" className="h-full w-full object-cover" />
                  </div>
                )}

                {/* News Content */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{item.articleTitle?.plainText || "No Title"}</h2>
                    <p className="text-gray-400 mt-2 text-sm">
                      By {item.byline || "Unknown"} - {new Date(item.date).toDateString()}
                    </p>
                  </div>

                  <p className="text-gray-300 text-sm mt-4 line-clamp-4">
                    {item.text?.plainText ? item.text.plainText.slice(0, 150) + "..." : "No content available"}
                  </p>

                  {/* Read More Button */}
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md mt-4 transition duration-300 transform hover:scale-105 shadow-md"
                  >
                    Read More
                  </a>

                  <p className="text-center text-gray-400 mt-4 text-xs">
                    Source:{" "}
                    <a href={item.source?.homepage?.url} className="text-yellow-400 hover:underline">
                      {item.source?.homepage?.label || "Unknown"}
                    </a>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* News Pagination Component */}
      <NewsPagination page={currentPage} hasNextPage={hasNextPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default News;
