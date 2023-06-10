'use client'
 
import { useSearchParams } from 'next/navigation'
import { AccessTimeFilled } from "@fluentui/react-icons";
 
export default function SearchBar() {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('search')
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {searchParams.get('nasi')}</>
}