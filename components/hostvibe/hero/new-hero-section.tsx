"use client";

import { JSX, useId, useState } from "react";

const image1 =
    "https://namecadre.com/_next/image?url=https%3A%2F%2Fdeep.namecadre.com%2Fassets%2F70d2e1d6-879a-4157-a4e9-0ee5336810f0&w=128&q=75";
const image2 =
    "https://namecadre.com/_next/image?url=https%3A%2F%2Fdeep.namecadre.com%2Fassets%2F4e9fc1a2-4182-4dc1-95bf-8b9c3b4f029a&w=128&q=90";
const image3 =
    "https://namecadre.com/_next/image?url=https%3A%2F%2Fdeep.namecadre.com%2Fassets%2F05fdc634-9f89-4c34-b1be-62300d52be1b&w=128&q=90";
const image4 =
    "https://namecadre.com/_next/image?url=https%3A%2F%2Fdeep.namecadre.com%2Fassets%2F6c511a00-1f51-41f1-832d-e3407484e963&w=128&q=90";
const image5 =
    "https://namecadre.com/_next/image?url=https%3A%2F%2Fdeep.namecadre.com%2Fassets%2Fe74b1fbb-d9df-4326-a6dd-24c56b4c95fd&w=128&q=90";

const domainCards = [
    {
        id: "com",
        image: image1,
        imageAlt: ".com",
        price: "$10.9 USD",
        width: "w-[130px]",
    },
    {
        id: "fun",
        image: image2,
        imageAlt: ".fun",
        price: "$3.73 USD",
        width: "w-[132px]",
    },
    {
        id: "info",
        image: image3,
        imageAlt: ".info",
        price: "$8.41 USD",
        width: "w-[132px]",
    },
    {
        id: "pw",
        image: image4,
        imageAlt: ".pw",
        price: "$3.74 USD",
        width: "w-[132px]",
    },
    {
        id: "online",
        image: image5,
        imageAlt: ".online",
        price: "$4.67 USD",
        width: "w-[132px]",
    },
];

export const AriseHero = (): JSX.Element => {
    const inputId = useId();
    const [domainQuery, setDomainQuery] = useState("");

    return (
        <section className="relative isolate h-auto w-full overflow-hidden bg-[#00020f] pt-[120px]">
            <img
                className="pointer-events-none absolute left-0 top-0 h-auto w-full"
                src="/hostvibe/images/hero-bg.svg"
                alt=""
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,2,15,0.08)_0%,rgba(0,2,15,0.24)_34%,rgba(0,2,15,0.92)_100%)]"
                aria-hidden="true"
            />

            <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center px-4 pb-14 pt-20 sm:px-6 lg:pt-24">
                <a
                    href="#offers"
                    className="inline-flex items-center gap-2.5 rounded-[100px] border border-[#ffffff1a] bg-[#ffffff29] pl-4 pr-2 py-2 text-[17px] font-bold text-[#a7adbe] shadow-[0px_8px_10.9px_#0003121f,0px_1px_1px_#0003124c] backdrop-blur-[6px]"
                >
                    <span>Click to check our offers</span>
                    <span className="flex h-[26px] w-[36px] items-center justify-center rounded-[100px] bg-[#2e3ecc] text-[15px] text-white">
                        ➜
                    </span>
                </a>

                <h1 className="mt-3 text-center !text-[clamp(34px,3.8vw,52px)] font-bold leading-[1.08] text-[#fcfcfc]">
                    Be Success With a Dream
                    <br />
                    Domain Name
                </h1>

                <p className="mt-3 max-w-[700px] text-center !text-[clamp(18px,1.2vw,26px)] leading-[1.38] text-[#d9d9d9]">
                    Your domain name is your website address. While .com names are
                    the most popular, explore .org, .tech.co and more.
                </p>

                <form
                    className="mt-4 flex w-full max-w-[700px] overflow-hidden rounded-[8px] border border-[#d9d9d9] bg-[#fcfcfc]"
                    onSubmit={(event) => event.preventDefault()}
                    role="search"
                    aria-label="Domain name search"
                >
                    <div className="relative flex min-w-0 flex-1 items-center">
                        <span
                            className="pointer-events-none absolute left-[25px] top-[17px] h-5 w-5 bg-[url(/vector.svg)] bg-[100%_100%] opacity-60"
                            aria-hidden="true"
                        />
                        <label htmlFor={inputId} className="sr-only">
                            Find your best domain name
                        </label>
                        <input
                            id={inputId}
                            name="domain"
                            type="text"
                            value={domainQuery}
                            onChange={(event) => setDomainQuery(event.target.value)}
                            placeholder="Find your best domain name"
                            className="h-[55px] w-full bg-transparent pl-[61px] pr-[52px] text-[17px] font-semibold text-[#595959] outline-none placeholder:text-[#bfbfbf]"
                            autoComplete="off"
                            spellCheck={false}
                        />
                        <button
                            type="button"
                            className="absolute right-5 top-2 flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#2e3ecc] text-[#2e3ecc]"
                            aria-label="Domain settings"
                        >
                            <span className="text-[19px] leading-none">⚙</span>
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="h-[55px] w-[130px] bg-[#2e3ecc] text-[17px] font-normal text-[#fcfcfc] transition-colors duration-200 hover:bg-[#2432b8]"
                        aria-label="Search domain"
                    >
                        Search
                    </button>
                </form>

                <div className="mt-2 flex w-full max-w-[700px] items-center justify-between text-sm font-extrabold text-[#d9d9d9]">
                    <a href="#offers" id="offers" className="inline-flex items-center gap-1">
                        Special Offers <span>»</span>
                    </a>
                    <a
                        href="#domain-ip-check"
                        id="domain-ip-check"
                        className="inline-flex items-center gap-1"
                    >
                        Domain IP Check <span>»</span>
                    </a>
                </div>

                <div className="mt-2 hidden w-full max-w-[700px] grid-cols-5 gap-2.5 lg:grid">
                    {domainCards.map((card) => (
                        <article key={card.id} className={`${card.width} overflow-hidden rounded-[5px]`}>
                            <div className="flex h-[50px] items-center justify-center bg-[#fcfcfc]">
                                <img src={card.image} alt={card.imageAlt} className="h-10 w-[100px]" />
                            </div>
                            <div className="flex h-[42px] items-center justify-center bg-[#2e3ecc] text-[15px] font-bold text-[#fcfcfc]">
                                {card.price}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-9 w-full max-w-[700px] lg:hidden">
                    <div className="grid grid-cols-4 gap-2">
                        {domainCards
                            .filter((card) => card.id !== "pw")
                            .map((card) => (
                            <article key={`${card.id}-mobile`} className="overflow-hidden rounded-[5px]">
                                <div className="flex h-[44px] items-center justify-center bg-[#fcfcfc]">
                                    <img src={card.image} alt={card.imageAlt} className="h-8 w-[78px]" />
                                </div>
                                <div className="flex h-[42px] items-center justify-center bg-[#2e3ecc] px-1 text-[12px] font-bold text-[#fcfcfc]">
                                    {card.price}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AriseHero;
