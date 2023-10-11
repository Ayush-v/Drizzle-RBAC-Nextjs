import Header from "@/components/Header";

export default function DashBoardPage() {
  return (
    <div>
      <Header
        title="Page UI/UX"
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores cumque iure facere repellat consequatur aut deleniti doloremque debitis facilis iusto!"
        }
      />
      <div className="@container">
        <h1 className="text-5xl @xs:text-red-600">Hello WOrld</h1>
      </div>
    </div>
  );
}
