import { fetchCharacters } from "@/api";
import RootLayout from "@/app/_app";
import { CardContainer } from "@/components/CardContainer";
import Pagination from "@/components/Pagination";
import { Title } from "@/components/Title";
import { TITLE } from "@/shared/constants";
import { CharacterType } from "@/shared/types";
import { useEffect, useState } from "react";

function HomePage() {
  const [currentCards, setCurrentCards] = useState<CharacterType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPageData = async () => {
    try {
      const response = await fetchCharacters(currentPage);
      setCurrentCards(response.results);
      setTotalPages(response.info.pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPageData();
  }, [currentPage]);

  return (
    <RootLayout>
      <Title title={TITLE} />
      <div className="w-screen h-screen items-center">
        <CardContainer cards={currentCards} />
        <Pagination
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </RootLayout>
  );
}

export default HomePage;
