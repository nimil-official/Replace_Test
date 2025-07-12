// pages/Configurator.jsx
import React, { useEffect, useState } from 'react';
import SceneCanvas from '../components/Configurator/SceneCanvas';
import { useParams } from 'react-router';

export default function Configurator() {
  const { detailsId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log("details id is ", detailsId)
        const res = await fetch(`http://localhost:5001/api/productDetails/${detailsId}`);
        const data = await res.json();
        setProductDetails(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [detailsId]);

  return (
    <div className="w-full h-screen bg-white">
      <SceneCanvas data = {productDetails}/>
    </div>
  );
}
