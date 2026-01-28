import { Header } from '../../components/header.jsx'
import { OffersSection } from '../../components/offerSection.jsx'
import { TrendingProducts } from '../../components/trendingProducts.jsx'
import Footer from '../../components/footer.jsx'
import { useState } from 'react'
import ContextProvider from '../../context/contextProvider.jsx'
import Sidebar from '../../components/sidebar.jsx'
import UseAuth from '../../context/useAuth.js'
import Loader from '../../components/skeletons/loader.jsx'
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMobileSearch, setOpenMobileSearch] = useState(false)
  const { isUser, setIsUser } = UseAuth()
  
 
  if (isUser.loading) {
    return (
      <Loader />
    )
  }
  return (
    <div className="min-h-dvh flex flex-col justify-between" onClick={() => setOpenMobileSearch(false)}>
      <Header toggleSidebar={() => setIsSidebarOpen(prev => !prev)} setOpenMobileSearch={setOpenMobileSearch} openMobileSearch={openMobileSearch} />
      <OffersSection />
      <TrendingProducts/>
      <Footer />

      {/* Backdrop */}
      <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 z-40 ${isSidebarOpen ? "fixed" : "hidden"}`}
          onClick={() => setIsSidebarOpen(false)}
        />
      <div
          className={`
          fixed top-0 right-0
          h-[calc(100dvh)]
          bg-[#a3a3a362] backdrop-blur-xl
          z-40
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isSidebarOpen
              ? 'w-60 sm:w-80 md:w-80 lg:w-100 xl:w-100'
              : 'w-0'}
            `}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar/>
        </div>
    </div>
  );
}

// export default function Home() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [openMobileSearch, setOpenMobileSearch] = useState(false)
//   const{isUser, setIsUser}=UseAuth()
//   if(isUser.loading){
//     return(
//       <Loader/>
//     )
//   }
//   return (
//     <div className='h-dvh overflow-y-auto scrollbar-hide' onClick={() => { setOpenMobileSearch(false) }}>
//         <Header toggleSidebar={() => setIsSidebarOpen(prev => !prev)} setOpenMobileSearch={setOpenMobileSearch} openMobileSearch={openMobileSearch} />
//         <OffersSection />
//         <TrendingProducts />
//         <Footer />
//         {/* BACKDROP */}
//         {/* {isSidebarOpen && ( */}
//         <div
//           className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 z-40 ${isSidebarOpen ? "fixed" : "hidden"}`}
//           onClick={() => setIsSidebarOpen(false)}
//         />
//         <div
//           className={`
//           fixed top-0 right-0
//           h-[calc(100dvh)]
//           bg-[#a3a3a362] backdrop-blur-xl
//           z-40
//           overflow-hidden
//           transition-all duration-300 ease-in-out
//           ${isSidebarOpen
//               ? 'w-60 sm:w-80 md:w-80 lg:w-100 xl:w-100'
//               : 'w-0'}
//             `}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <Sidebar/>
//         </div>
//     </div>
//   );
// }