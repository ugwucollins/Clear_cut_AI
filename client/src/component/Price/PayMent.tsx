// import { usePaystackPayment, PaystackButton } from "react-paystack";

import { useNavigate } from "react-router-dom";
import { UserAuthInfo } from "../../App";
import { usePaystackPayment } from "react-paystack";
import { ApiUrl } from "../../context/ApiUrl";
import { toast } from "react-toastify";

// const config = {
//   reference: new Date().getTime().toString(),
//   email: "user@example.com",
//   amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//   publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
// };

// // you can call this function anything
// const onSuccess = (reference: any) => {
//   // Implementation for whatever you want to do with reference and after success call.
//   console.log(reference);
// };

// // you can call this function anything
// const onClose = () => {
//   // implementation for  whatever you want to do when the Paystack dialog closed.
//   console.log("closed");
// };

// const PayStackHookExample = () => {
//   const initializePayment = usePaystackPayment(config);
//   return (
//     <div>
//       <button
//         onClick={() => {
//           initializePayment({ onSuccess: onSuccess, onClose: onClose });
//         }}
//       >
//         Paystack Hooks Implementation
//       </button>
//     </div>
//   );
// };

// //  new paysstact

// const config2 = {
//   reference: new Date().getTime().toString(),
//   email: "user@example.com",
//   amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//   publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
// };

// // you can call this function anything
// const handlePaystackSuccessAction = (reference: any) => {
//   // Implementation for whatever you want to do with reference and after success call.
//   console.log(reference);
// };

// // you can call this function anything
// const handlePaystackCloseAction = () => {
//   // implementation for  whatever you want to do when the Paystack dialog closed.
//   console.log("closed");
// };

// const PayMent = () => {
//   const componentProps = {
//     ...config2,
//     text: "Clear_Cut  BG Remover Ai",
//     onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
//     onClose: handlePaystackCloseAction,
//   };

//   return (
//     <div>
//       <PayStackHookExample />
//       <PaystackButton {...componentProps} />
//     </div>
//   );
// };

// export default PayMent;

export const PayMent = (amount: any, ref: any) => {
  const router = useNavigate();
  console.log(amount);
  console.log(ref);

  const { user }: any = UserAuthInfo();

  const config = {
    reference: ref || new Date().getTime().toString(),
    email: user && user.email,
    amount: amount, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: import.meta.env.VITE_PAY_API_KEY,
  };
  const initializePayment = usePaystackPayment(config);

  // console.log(value);

  // you can call this function anything
  const onSuccess = async (reference: any) => {
    console.log(reference);

    try {
      const res = await ApiUrl.put("/transaction/verify", {
        ref: reference.reference || config.reference,
      });
      const data = res.data;
      if (data.success) {
        toast.success(data.message, {
          toastId: "p",
        });
        setTimeout(() => {
          router("/workspace", { replace: true });
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(reference);
  };

  // you can call this function anything
  const onClose = async () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    const all: any = localStorage.removeItem("hey");
    const jValue = JSON.parse(all);
    console.log(jValue);

    try {
      const res = await ApiUrl.delete("/transaction/delete/" + jValue);
      const data = res.data;
      if (data.success) {
        toast.success(data.message, {
          toastId: "p",
        });
        setTimeout(() => {
          router("/workspace", { replace: true });
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("closed");
  };

  // function payNow() {
  //   initializePayment({ onSuccess, onClose });
  // }
  return initializePayment({ onSuccess, onClose });
};
