import axios from "axios";

const HTTP_URL_PYTHON = import.meta.env.VITE_HTTP_URL_PYTHON;

const PythonHttpService = () => {
    const sendFile = async (file, token) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(HTTP_URL_PYTHON, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    };

    return { sendFile };
};

export default PythonHttpService;
