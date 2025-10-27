import { useState } from "react";
import icon_search from "./../assets/image/icon_search.png";
// import { useNavigate } from "react-router-dom";
export const SearchProduct = () => {
  // eslint-disable-next-line no-unused-vars
  const [keyword, setKeyword] = useState("");
  //   const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.keyword.value);
  };

  return (
    <form
      className="relative  hidden lg:flex items-center border border-gray-300 rounded-full px-3 h-10 w-72"
      onSubmit={handleSubmit}
    >
      <img src={icon_search} alt="Search" className="w-4 h-4 absolute left-4" />
      <input
        type="text"
        placeholder="Tìm kiếm thông tin về sức khỏe tim mạch ..."
        name="keyword"
        className="bg-transparent w-full pl-10 pr-4 text-sm focus:outline-none"
        defaultValue={keyword}
      />
    </form>
  );
};
