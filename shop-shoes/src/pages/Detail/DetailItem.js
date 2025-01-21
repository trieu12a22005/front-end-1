import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import "./detail.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function DetailItem({ detail }) {
  const [selectedSize, setSelectedSize] = useState(null); 
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  console.log(detail._id);
  const handleSize = (index) => {
    setSelectedSize(index);
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || (Number(newValue) >= 1 && Number(newValue) <= 100)) {
      setQuantity(newValue === "" ? "" : Number(newValue));
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  const handlePlus = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < 100 ? prevQuantity + 1 : 100
    );
  };

  const handleMinus = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const postCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3055/api/v1/cart/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhjNzZkZGFiZmMzMzBhYjQ2MjYzYTYiLCJlbWFpbCI6InRkaW5oQGdtYWlsLmNvbSIsImlhdCI6MTczNzM0Njg2MywiZXhwIjoxNzM3NTE5NjYzfQ.tzfHCxk49rC9heSBUtRWRwiK76zgw2bSovWsG__19wU",
          "x-client-id": "678c76ddabfc330ab46263a6",
        },
        body: JSON.stringify({
          product: {
            productId: detail._id,
            quantity: quantity,
            size: selectedSize,
          },
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: data.message || "Bạn đã thêm sản phẩm vào giỏ hàng",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error(data.message || "Đã xảy ra lỗi khi thêm sản phẩm!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message || "Không thể thêm sản phẩm vào giỏ hàng!",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCart = () => {
    if (selectedSize === null) {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng chọn size trước khi thêm vào giỏ hàng!",
      });
      return;
    }
    postCart();
  };

  return (
    <div className="detail">
      <div className="detail__image">
        <img src={detail.product_thumbnails} alt={detail.product_name} />
      </div>
      <div className="detail__info">
        <div className="detail__name">{detail.product_name}</div>
        <div className="detail__description">{detail.product_description}</div>
        <div className="detail__price">₫{detail.product_price}</div>
        <div className="detail__buy">
          <div>
            <div className="detail__size-title">Size giày</div>
            {detail.product_sizes?.map((item, index) => (
              <button
                key={index}
                className={`detail__size ${
                  selectedSize === item ? "detail__choose" : ""
                }`}
                onClick={() => handleSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="detail__stock">
            <span>Số lượng </span>
            <div className="detail__stock-buy">
              <button
                className="button-2"
                onClick={handleMinus}
                disabled={isLoading}
              >
                -
              </button>
              <input
                type="number"
                value={quantity} 
                onChange={handleChange} 
                onBlur={handleBlur}
                min="1"
                max="100"
                disabled={isLoading}
              />
              <button
                className="button-2"
                onClick={handlePlus}
                disabled={isLoading}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <button
          className="detail__button"
          onClick={handleCart}
          disabled={isLoading}
        >
          {isLoading ? "Đang thêm..." : "Thêm vào giỏ hàng"} <IoCartOutline />
        </button>
      </div>
    </div>
  );
}

export default DetailItem;
