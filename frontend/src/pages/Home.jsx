import { useState } from "react";
import Hero from "../components/Hero";
import UploadCard from "../components/UploadCard";
import ResultCard from "../components/ResultCard";
import MainLayout from "../layouts/MainLayout";

function Home() {
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);

  return (
    <MainLayout>
      <Hero />

      <UploadCard
        setResult={setResult}
        preview={preview}
        setPreview={setPreview}
      />

      <ResultCard
        result={result}
        preview={preview}
      />
    </MainLayout>
  );
}

export default Home;