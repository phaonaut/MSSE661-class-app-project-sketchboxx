const SKETCHES_API = `${BASE_API_URL}/sketches`;

const postSketch = async (formData) => await _post(`${SKETCHES_API}`, formData, DEFAULT_OPTIONS_WITH_AUTH);

const getSketches = async () => {
   return await _get(`${SKETCHES_API}`);
}