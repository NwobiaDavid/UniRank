import Image from "next/image";
import GetStartedButton from "../components/ui/btn/GetStartedButton";
import { getServerSession } from "next-auth";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";

export default async function Home() {
  const session = (await getServerSession()) || {};

  const uni = [
    {
      name: "",
      image: "",
    }
  ]

  const reasons = [
    {
      reason: "Tailored for University Students"
    }, {
      reason: "⏱ Timed Questions to Enhance Your Skills"
    }, {
      reason: "📊 Rank Among Your Peers"
    }, {
      reason: "🔒 Secure and Cheating-Proof"
    }
  ]

  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="h-[70dvh] flex flex-col justify-center items-center " >
          <div className=" mb-10 flex flex-col justify-center items-center " >
            <h2 className="text-7xl font-bold " >
              Welcome to UniRank
            </h2>
            <p className="text-2xl " >
              The ultimate platform for university students to test and improve their IQ!
            </p>
          </div>
          <div>
            <GetStartedButton session={session} />
          </div>
        </div>

        <div className="flex w-full pt-24 pb-32 flex-col justify-center items-center" >
          <h2 className="text-5xl mb-5 " >Why Take Our IQ Test?</h2>
          <div className="grid gap-3  grid-cols-2 grid-rows-2 " >
            {reasons.map((item: any, index) => (
              <div key={index} className=" p-3 rounded-lg flex justify-center items-center flex-col text-center border w-[600px] h-[300px]  ">
                {item.reason}
              </div>
            ))}

          </div>

        </div>

        <div className=" w-full flex flex-col justify-center items-center " >
          <h2 className="text-5xl mb-5 " >How It Works</h2>
          <div className=" w-[70%] p-4 justify-center  flex flex-col " >
            <div className="flex " >
              <div className="border  p-3 rounded-xl " >
                <h3>Click the &quot;Take Quiz&quot; button below to get started.</h3>
              </div>
            </div>
            <div className=" flex justify-end " >
              <div className="border  p-3 rounded-xl ">
                <h3 >Answer 30 randomly selected questions within the given time.</h3>
              </div>
            </div>
            <div className=" flex " >
              <div className="border  p-3 rounded-xl " >
                <h3>Get your score and see how you rank among other students!</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[60vh] flex justify-center items-center " >
          <div className=" flex flex-col justify-center items-center" >
            <h2 className="text-7xl mb-5 " >Ready to Challenge Yourself?</h2>
            <GetStartedButton session={session} />
          </div>
        </div>


        {/* <div>
        <div>
          <h2>leadership board</h2>
        </div>
        <div>
          image
        </div>

      </div>
      <div>
        <div>
          <h2>supported universities</h2>
        </div>
        <div className="grid justify-center items-center" >
          {uni.map((item,index)=>(
            <div key={index} >
              <div>
                {item.image}
              </div>
              <div>
                {item.name}
              </div>
            </div>
          ))}

        </div>
      </div> */}
      </main>
      <Footer />
    </>
  );
}
