import { Card } from "@radix-ui/themes";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { calculateTotal, groupCartItems } from "../components/CartWidget";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearCart } from "../store/actions/actions";

interface PaymentPageProps { }

const isValidCardNumber = (cardNumber: string): boolean => {
    return /^\d{16}$/.test(cardNumber);
};
const isValidCVV = (cvv: string): boolean => {
    return /^\d{3}$/.test(cvv);
};
const isValidExpDate = (expDate: string): boolean => {
    return /^(0[1-9]|1[0-2])\/\d{4}$/.test(expDate);
};

export const PaymentPage: FC<PaymentPageProps> = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((store) => store.cart.items);
    const groupedItems = groupCartItems(cartItems);
    const total = calculateTotal(groupedItems);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [isPaymentComplete, setIsPaymentComplete] = useState<boolean>(false);

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(e.target.value);
    };

    const handlePayment = () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }
        if (!paymentMethod) {
            alert("Please select a payment method");
            return;
        }
        if (paymentMethod === "online") {
            const cardNumberInput = document.getElementById("card_number") as HTMLInputElement;
            const expDateInput = document.getElementById("exp_date") as HTMLInputElement;
            const cvvInput = document.getElementById("cvv") as HTMLInputElement;

            if (!isValidCardNumber(cardNumberInput.value)) {
                alert("Please enter a valid card number (16 digits)");
                return;
            }
            if (!isValidCVV(cvvInput.value)) {
                alert("Please enter a valid CVV (3 digits)");
                return;
            }
            if (!isValidExpDate(expDateInput.value)) {
                alert("Please enter a valid expiration date (MM/YYYY)");
                return;
            }
        }
        dispatch(clearCart());
        setIsPaymentComplete(true);
    };

    return (
        <section className="container mx-auto mt-[6rem] bg-[#F4F2F0]">
            {isPaymentComplete ? (
                <div className="p-4">
                    <h1 className="text-2xl">Thank you for your order!</h1>
                    <p className="mb-4">Your order has been successfully placed.</p>
                    <Link to="/" className="bg-[#85714D]/80 text-white px-4 py-2 rounded mt-4">Continue Shopping</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 min-h-[42rem] h-auto gap-4">
                    <Card>
                        <div className="p-2">
                            <h1 className="text-2xl mb-4">Payment Details</h1>
                            {total > 0 ? (
                                <article className="max-h-[40rem] overflow-auto">
                                    {groupedItems.map((group) => (
                                        <div key={group.category} className="mb-4">
                                            <h2 className="text-lg">{group.category}</h2>
                                            <ul>
                                                {group.items.map((item) => (
                                                    <li key={item.id} className="flex justify-between">
                                                        <span>{item.name} x {item.quantity}</span>
                                                        <span>${item.price * item.quantity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center mt-4">
                                        <span>Total:</span>
                                        <span>${total}</span>
                                    </div>
                                </article>
                            ) : (
                                <p>Cart is empty</p>
                            )}
                        </div>
                    </Card>

                    <Card>
                        <div className="p-2">
                            <h1 className="text-2xl mb-4">Payment Information</h1>
                            {total > 0 && (
                                <article>
                                    <ul className="grid w-full gap-2 md:grid-cols-1 mb-4">
                                        <li>
                                            <input
                                                type="radio"
                                                id="online"
                                                name="paymentMethod"
                                                value="online"
                                                className="hidden peer"
                                                onChange={handlePaymentMethodChange}
                                                required
                                            />
                                            <label htmlFor="online" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-[#85714D] peer-checked:text-[#85714D] hover:text-gray-600 hover:bg-gray-100">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">Card</div>
                                                    <div className="w-full">Online payment by card</div>
                                                </div>
                                            </label>
                                        </li>

                                        <li>
                                            <input
                                                type="radio"
                                                id="cash"
                                                name="paymentMethod"
                                                value="cash"
                                                className="hidden peer"
                                                onChange={handlePaymentMethodChange}
                                            />
                                            <label htmlFor="cash" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-[#85714D] peer-checked:text-[#85714D] hover:text-gray-600 hover:bg-gray-100">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">Cash</div>
                                                    <div className="w-full">Payment to the courier upon receipt</div>
                                                </div>
                                            </label>
                                        </li>

                                        <li>
                                            <input
                                                type="radio"
                                                id="gift"
                                                name="paymentMethod"
                                                value="gift"
                                                className="hidden peer"
                                                onChange={handlePaymentMethodChange}
                                            />

                                            <label htmlFor="gift" className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-[#85714D] peer-checked:text-[#85714D] hover:text-gray-600 hover:bg-gray-100">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">Gift</div>
                                                    <div className="w-full">Payment to the courier upon receipt</div>
                                                </div>
                                            </label>
                                        </li>
                                    </ul>
                                    {paymentMethod && (
                                        <>
                                            <div className="mb-4">
                                                <label className="block mb-2">
                                                    <div className="mt-4">
                                                        <label htmlFor="card_number" className="block text-black mb-1">Email</label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            className="w-full rounded-lg border py-2 px-3 border-[#85714D]/80  outline-none"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </label>
                                                {paymentMethod === "online" && (
                                                    <div>
                                                        <h2 className="text-xl font-semibold text-black mb-2">Payment Information</h2>
                                                        <div className="mt-4">
                                                            <label htmlFor="card_number" className="block text-black mb-1">Card Number</label>
                                                            <input
                                                                type="text"
                                                                id="card_number"
                                                                className="w-full rounded-lg border py-2 px-3 border-[#85714D]/80 outline-none"
                                                                required
                                                                maxLength={16}
                                                                value={cardNumber}
                                                                onChange={handleCardNumberChange}
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                                            <div>
                                                                <label htmlFor="exp_date" className="block text-black mb-1">Expiration Date</label>
                                                                <input
                                                                    type="text"
                                                                    id="exp_date"
                                                                    className="w-full rounded-lg border py-2 px-3 border-[#85714D]/80 outline-none"
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="cvv" className="block text-black mb-1">CVV</label>
                                                                <input
                                                                    type="text"
                                                                    id="cvv"
                                                                    className="w-full rounded-lg border py-2 px-3 border-[#85714D]/80 outline-none"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <button className="bg-[#85714D]/80 text-white px-4 py-2 rounded-lg mt-4" onClick={handlePayment}>Pay</button>
                                        </>
                                    )}
                                </article>
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </section>
    )
};