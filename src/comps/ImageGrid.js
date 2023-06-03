import React from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
const ImageGrid = ({ setSelectedImage }) => {
  const { data } = useFirestore("images");

  return (
    <div className="img-grid">
      {data &&
        data.map((image) => {
          return (
            <motion.div
              className="img-wrap"
              key={image.id}
              layout
              whileHover={{ opacity: 1 }}
              onClick={() => setSelectedImage(image.url)}
            >
              <motion.img
                src={image.url}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
