import { motion } from "framer-motion";
import { anim } from "../Index";

const Formsidebar = ({ img }: { img: string }) => {
    return (
        <div
            className="relative bg-primary pb-5"
        >
            <motion.div
			variants={anim("", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
			className="w-[20rem] sm:w-auto mx-auto">
                <img src={img} alt="banner" />
            </motion.div>
            <div>
                <h4 className="font-extendfont9 text-4xl text-center">
                    Kushtia Polytechnic Institute
                </h4>
                <p className="text-sm text-center px-5">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Doloribus dignissimos harum tempore alias soluta fugit
                    veritatis itaque molestiae eum necessitatibus?
                </p>
            </div>
        </div>
    );
};

export default Formsidebar;
