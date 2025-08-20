
import { FaPaintBrush, FaTshirt, FaGem, FaHome, FaMusic, FaLeaf, FaGift, FaBook } from "react-icons/fa";
import { GiBrokenPottery } from "react-icons/gi";
import { NavLink } from 'react-router';

// const categoryPromise = fetch('/category.json')
//     .then((res) => {
//         return res.json();
//     }).catch((err) => {
//         return console.log(err);

//     })



const CategoryLinks = () => {
    // const categories = use(categoryPromise);
    return (
        <>
            {/* {
                categories.map((category) => (
                    <NavLink
                        to={`/category/${category.id}`}
                        key={category.id}
                        className="flex items-center gap-2 px-3 py-2 rounded"
                    >

                        <span>{category.name}</span>
                    </NavLink>
                ))
            } */}

            <NavLink
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded "
            >
                <FaHome className="text-xl" />
                <span>Home Decor</span>
            </NavLink>
            <NavLink
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded "
            >
                <FaPaintBrush className="text-xl" />
                <span>Handicrafts & Art</span>
            </NavLink>

            <NavLink
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded "
            >
                <FaTshirt className="text-xl" />
                <span>Clothing & Textiles</span>
            </NavLink>

            <NavLink
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded "
            >
                <FaGem className="text-xl" />
                <span>Jewelry & Accessories</span>
            </NavLink>



            <NavLink
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded "
            >
                <FaMusic className="text-xl" />
                <span>Musical Instruments</span>
            </NavLink>

            <NavLink
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded "
            >
                <FaLeaf className="text-xl" />
                <span>Organic Foods & Spices</span>
            </NavLink>

            <NavLink
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded "
            >
                <FaGift className="text-xl" />
                <span>Festivals & Gift Items</span>
            </NavLink>

            <NavLink
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded "
            >
                <FaBook className="text-xl" />
                <span>Books </span>
            </NavLink>

            <NavLink
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded "
            >
                <GiBrokenPottery className="text-xl" />
                <span>Pottery</span>
            </NavLink>

        </>
    );
};

export default CategoryLinks;