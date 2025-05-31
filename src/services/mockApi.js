const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const mockApi = {
  get: async (url) => {
    console.log('Mock GET:', url);
    await delay(500);
    // Retourne données mock selon url
    if (url === '/partners') {
      return { data: [{ id: 1, universityName: 'Université A', country: 'Maroc', gradingScale: '20' }] };
    }
    return { data: [] };
  },
  post: async (url, body) => {
    console.log('Mock POST:', url, body);
    await delay(500);
    return { data: body };
  },
  put: async (url, body) => {
    console.log('Mock PUT:', url, body);
    await delay(500);
    return { data: body };
  },
  delete: async (url) => {
    console.log('Mock DELETE:', url);
    await delay(500);
    return { data: true };
  },
};

export default mockApi;
