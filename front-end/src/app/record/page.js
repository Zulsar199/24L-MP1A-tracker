import { Header } from "@/components/Header";
import { Sidebar } from "@/components/record/sidebar/index";
import { Records } from "@/components/record/records/index";
 
export default function Record() {
  return (
    <div>
      <Header />
      <div className="py-6 bg-gray-200">
        <div className="flex justify-between max-w-[1200px] m-auto  ">
          <Sidebar/>
          <Records/>
        </div>
      </div>
    </div>
  );
}