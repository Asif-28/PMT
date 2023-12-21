import Image from "next/image";

const Header = () => {
  return (
    <main className="section h-32">
      <div className="flex  items-center justify-between">
        <div className="left flex items-center gap-6">
          <div className="rounded-full px-5 py-5 bg-white w-[4rem] flex justify-center items-center">
            <Image src={`/category.png`} alt="header" height={30} width={30} />
          </div>
          <div>
            <Image src={`/Frame 1.png`} alt="header" height={50} width={110} />
          </div>
        </div>
        <div className="flex items-center relative">
          <input
            placeholder="search"
            className="text-[15px] border-none lg:min-w-[700px] px-16 py-4 rounded-full focus:outline-blue-900 focus:shadow-outline"
            type="search"
          />
          <div className=" absolute left-5">
            <Image
              src={`/search-normal.png`}
              alt="image"
              height={10}
              width={20}
            />
          </div>
        </div>
        <div className=" flex items-center gap-10">
          <div className="flex  gap-10 border border-[#008000] px-8 py-[1.2rem] items-center justify-center rounded-full">
            <div className="w-4 h-4 rounded-full bg-[#008000]"></div>
            <h3>Active </h3>
          </div>
          <div>
            <Image src={`/Ellipse 2.png`} alt="image" height={70} width={70} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Header;
