function mockApi() {
  return new Promise((resolve, reject) => {
    const r = Math.random();

    if (r < 0.33) {
      setTimeout(() => reject({ status: 503 }), 800);
      return;
    }

    if (r < 0.66) {
      setTimeout(() => resolve({ ok: true }), 6000);
      return;
    }

    setTimeout(() => resolve({ ok: true }), 800);
  });
}

export default mockApi;
