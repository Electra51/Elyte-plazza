import { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isBuyerLoading, setIsBuyerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(
        `https://icebox-server-9upx1roo2-electra51.vercel.app/users/buyer/${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsBuyer(data.isAdmin);
          setIsBuyerLoading(false);
        });
    }
  }, [email]);
  return [isBuyer, isBuyerLoading];
};

export default useBuyer;
