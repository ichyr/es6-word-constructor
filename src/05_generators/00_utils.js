function coroutine(g) {
  const it = g();
  return function() {
    return it.next().apply(it, arguments);
  };
}

export { coroutine };
