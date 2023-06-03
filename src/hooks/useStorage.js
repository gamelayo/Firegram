import { useState, useEffect } from "react";
import { storage, db } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const uploadFile = async () => {
    try {
      const storageRef = ref(storage, `firegram/${Date.now()}${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
          setUrl(downloadURL);
          await addDoc(collection(db, "images"), {
            url: downloadURL,
            createdAt: Timestamp.now().toDate(),
          });
        }
      );
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    uploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { progress, url, error };
};

export default useStorage;
