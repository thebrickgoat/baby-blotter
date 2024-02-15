import supabase from '../utils/supabase/client'

export default async function Home() {

  let { data: blotters, error } = await supabase.from("blotters").select("*");
  let reversedBlotters = blotters?.reverse();

  const formatedDate = (date : string) => {
    const formatedDate = new Date(date).toDateString();
    const formatedTime = new Date(date).toLocaleTimeString();
    return `${formatedDate}, ${formatedTime}`;
  }
  return (
    <div className="container px-8 mx-auto py-8 ">
      <div className="hidden bg-accent-1 bg-accent-2 bg-accent-3 bg-accent-4 bg-accent-5" />
      <h1 className="mb-6 md:mb-8 text-6xl font-bold">Latest Blots</h1>
      <div className="">
        {reversedBlotters?.map((blotter) => (
          <div className={`p-8 my-8 first-of-type:mt-0 text-white rounded-md drop-shadow-xl	 bg-accent-${Math.floor(Math.random() * 4) + 2}`} key={blotter.id}>
            <div className="flex text-lg pb-4">{formatedDate(blotter.created_at)}</div>
            <div className="flex pb-4">***</div>
            <p>{blotter.text}</p>
            <div className="flex pt-4">***</div>
          </div>
        ))}
      </div>
    </div>
  );
}
