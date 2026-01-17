import { Button } from "./ui/button"
const data = [
    {id:1, title: "FAQ" },
    {id:2, title: "Help Centre" },
    {id:3, title: "Account" },
    {id:4, title: "Media Centre" },
    {id:5, title: "Investor Relations" },
    {id:6, title: "Jobs" },
    {id:7, title: "Ways to Watch" },
    {id:8, title: "Terms of Use" },
    {id:9, title: " Privacy" },
    {id:10, title: "Cookie Preferences" },
    {id:11, title: "Corporate Information" },
    {id:12, title: "Contact Us" },
    { id:13, title: "Speed Test" },
    { id:14, title: "Legal Notices" },
    { id:15, title: "Only on Netflix" }
]
export default function Footer({ }) {
    return (
        <div className="bg-[#7c3cfb] text-white py-6">
            <div className="container w-full mx-auto px-6">
                <footer>

                    <div className="">Questions? Call 000-800-919-1743</div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3">
                        {data.map((content) => (
                            <div key={content.id} className="flex justify-center items-center">
                                <div className="hover:text-[#001749] transition-all duration-200 w-fit ">
                                    {content.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="last">
                        <div className="optn">
                            <div className="lft">
                                <img src="images/languages.svg" alt="" />
                            </div>
                            <select class="option">
                                <option lang="en" label="English" value="en-IN">English</option>
                                <option lang="hi" label="हिन्दी" value="hi-IN">हिन्दी</option>
                            </select>
                            <div className="rit">
                                <img src="images/dorpdown.svg" alt="" />
                            </div>
                        </div>
                    </div> */}
                </footer>
            </div>
        </div>
    )
} 