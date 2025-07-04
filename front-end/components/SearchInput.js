import React, {useState} from 'react'
import { useRouter } from 'next/router'

const SearchInput = () => {
    const [search, setSearch] = useState('')
    const router = useRouter()

    const handleSearch = (e) => {
        if (e.key === 'Enter' && search.trim()) {
            router.push(`/search/${search.trim()}`)
        }
    }

    return (
        <div className="w-full">   
            <div className="relative group">
                <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
                    <svg 
                        aria-hidden="true" 
                        className="w-5 h-5 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input 
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleSearch}
                    type="search" 
                    id="default-search" 
                    className="block w-full p-3 pl-12 text-sm text-[var(--text)] bg-white rounded-full border border-gray-200 
                             focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] 
                             transition-all duration-300 placeholder-gray-400
                             hover:border-gray-300"
                    placeholder="Search products..." 
                    required 
                />
            </div>
        </div>
    )
}

export default SearchInput