import { Header } from "@/components/Header";
import { Sidebar } from "@/components/record/Sidebar";
import { Records } from "@/components/record/Records";
 
export default function Record() {
  return (
    <div>
      <Header />
      <div className="py-6 bg-gray-200">
        <div className="flex justify-between max-w-[1200px] m-auto  ">
          <Sidebar />
          <Records/>
        </div>
      </div>
    </div>
  );
}