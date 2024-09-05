import React, { useState, ChangeEvent } from 'react'
import { InputFormType  } from "@/app/modals/inputFormType";
import { broadcastAPI } from '../api/broadcast';
import { transactionAPI } from '../api/transaction';
import { HTTP_METHOD } from '../type/http.type';
import { bandApi } from '../constants/api';
import { IBroadcast , ITransaction } from '../type/api.type';

function InputForm() {
    const [cryptoCoin, setCryptoCoin] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [error, setError] = useState("");
    const [pending, setPending] = useState<boolean>(false);
    const [success, setSuccess] = useState("");

    function changeInputPrice(event: ChangeEvent<HTMLInputElement>): void {
        const priceValue = Number(event.target.value)
        setPrice(priceValue);
    }
    const wait = async (ms: number) => {
        return new Promise(resolve => setTimeout(resolve,ms))
    }
    function refreshStatus() {
        setSuccess("")
        setError("")
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!cryptoCoin || !price) {
            setError("Please complete all inputs.");
            return;
        }
        try {

            const timestamp = Date.now();
            const payload: InputFormType = {
                symbol: cryptoCoin,
                price: price,
                timestamp: timestamp
            }

            const reqBroadcastAPI: IBroadcast = await broadcastAPI(
                bandApi.broadcastAPI,
                payload,
                HTTP_METHOD.POST
            )
            
            let reqTransactionAPI: ITransaction = await transactionAPI(
                `${bandApi.transactionAPI}${reqBroadcastAPI.tx_hash}`,
                HTTP_METHOD.GET
            )
            console.log(reqTransactionAPI);
            while (reqTransactionAPI.tx_status === "PENDING"){
                setPending(true)
                await wait(10000);
                reqTransactionAPI = await transactionAPI(
                    `${bandApi.transactionAPI}${reqBroadcastAPI.tx_hash}`,
                    HTTP_METHOD.GET
                )
                console.log(reqTransactionAPI);
                
            }
            setPending(false)

            if (reqTransactionAPI.tx_status === "CONFIRMED" ){
                setError("");
                const form = e.target;
                setSuccess("Transaction has been processed and confirmed");
                form.reset();
            }
            if (reqTransactionAPI.tx_status === "FAILED" ) {
                setError("Transaction failed to process");
                return;
               
            }
            if (reqTransactionAPI.tx_status === "DNE") {
                setError("Transaction does not exist");
                return;
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }


  return (
      <div className='flex-grow'>
          <div className="flex justify-center items-center">
              <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                  <h3 className='text-3xl'>Broadcast Transaction</h3>
                  <hr className='my-3' />
                  <form onSubmit={handleSubmit}>

                      {error && (
                          <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                              {error}
                          </div>
                      )}

                      {success && (
                          <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                              {success}
                          </div>
                      )}


                      <input type="text" onClick={refreshStatus} onChange={(e) => setCryptoCoin(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter coin name' />
                      <input type="number" onClick={refreshStatus}  onChange={changeInputPrice} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter price' />
                      {!pending ? (<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white border py-2 px-3 rounded text-lg my-2 w-full">Send Transaction</button>): 
                          <button type="button" className="bg-gray-300 text-white border py-2 px-3 rounded text-lg my-2 items-center w-full" disabled>
                              Pending .....
                          </button>
                      }
                  </form>
                  
              </div>
          </div>
      </div>
  )
}

export default InputForm
