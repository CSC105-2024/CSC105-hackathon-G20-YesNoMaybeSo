import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getGroupsByUser } from "../api/groupApi";
import { getuserid } from "../api/userApi";

interface Group {
  GroupId: number;
  GroupName: string;
}

const Category: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Group[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const profile = await getuserid();

      const userId = profile?.user?.id;
      if (profile.success && userId) {
        const groups = await getGroupsByUser(userId);
        setCategories(groups || []);
      } else {
        console.warn("No userId found in profile response.");
      }
    };

    fetchAll();
  }, []);

  const CategoryComponent = ({ name, id }: { name: string; id: number }) => (
    <div
      onClick={() => navigate(`/categoryitem/${id}`)}
      className="w-[300px] h-[300px] bg-white rounded-2xl shadow-md p-4 sm:p-6 items-center cursor-pointer hover:scale-105 transition-transform"
    >
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 flex items-center h-full justify-center text-center">
        {name}
      </h1>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-secondary pb-8 flex flex-col items-center gap-6 pt-10">
        <h2 className="text-3xl font-bold text-accent">Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/addnewcategory")}
            className="w-[300px] h-[300px] border-2 border-black rounded-2xl border-dashed cursor-pointer hover:bg-white/60 bg-white/37 hover:scale-105 shadow-md p-4 sm:p-6 text-lg sm:text-xl md:text-2xl font-bold text-slate-800 flex items-center justify-center"
          >
            + Add New Category
          </div>

          {categories.map((cate) => (
            <CategoryComponent key={cate.GroupId} id={cate.GroupId} name={cate.GroupName} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
