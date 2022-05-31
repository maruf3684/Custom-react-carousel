import React, { useEffect, useRef, useState } from "react";

//photos from/public/images folder
const featureproducts = [
	"./images/hero_1.png",
	"./images/hero_2.png",
	"./images/hero_3.png",
];

const Carasoul = () => {
	const [index, setindex] = useState(0);
	const slideRef = useRef(null);
	const intervalHook = useRef(null);

	const handleNext = () => {
		setindex((index) => {
            if (index === featureproducts.length - 1) {
                return 0;
            }
            return index + 1;
        }
        );
		slideRef.current.classList.add("fade-anim");
	};

	const handlePrev = () => {
		setindex((index) => index - 1);

		if (index === 0) {
			setindex((index)=>featureproducts.length - 1);
		}

		slideRef.current.classList.add("fade-anim");
	};

	const startinterval = () => {
		intervalHook.current = setInterval(() => {
			handleNext();
		}, 3000);
	};

	const stopinterval = () => {
		clearInterval(intervalHook.current);
	};

	const removeAnimation = () => {
		slideRef.current.classList.remove("fade-anim");
	};

	useEffect(() => {
		slideRef.current.addEventListener("animationend", removeAnimation);
		slideRef.current.addEventListener("mouseleave", (e) => {
			startinterval();
		});
		slideRef.current.addEventListener("mouseenter", (e) => {
			stopinterval();
		});

		startinterval();
		return () => {
			stopinterval();
		};
	}, []);

	return (
		<div ref={slideRef} className="w-full select-none  relative">
			<div className="aspect-w-16 aspect-h-9">
				<img
					src={featureproducts[index]}
					alt=""
					className="object-cover w-full "
				/>
			</div>

			<div className="w-full absolute flex justify-between items-center top-1/2">
				<button
					onClick={handlePrev}
					className="font-bold text-2xl text-white px-4 py-2 mx-4 bg-white bg-opacity-30 rounded-3xl "
				>
					&lt;
				</button>
				<button
					onClick={handleNext}
					className="font-bold text-2xl text-white px-4 py-2 mx-4 bg-white bg-opacity-30 rounded-3xl "
				>
					&gt;
				</button>
			</div>
		</div>
	);
};

export default Carasoul;
