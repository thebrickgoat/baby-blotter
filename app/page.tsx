import supabase from '../utils/supabase/client'
import BlotterContainer from './components/blooterContainer';

export default async function Home() {

  let { data: blotters } = await supabase.from("blotters").select("*");
  let reversedBlotters = blotters?.reverse() ?? [];
  
  return (
    <div className="container px-8 mx-auto py-8 ">
      <div className="hidden bg-accent-1 bg-accent-2 bg-accent-3 bg-accent-4 bg-accent-5" />
      <h1 className="mb-6 md:mb-8 text-6xl font-bold">Latest Blots</h1>
      <BlotterContainer blotters={reversedBlotters} />
    </div>
  );
}
