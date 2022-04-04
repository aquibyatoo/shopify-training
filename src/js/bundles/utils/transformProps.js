export default (propsEl) => {
  const propsJson = propsEl && document.querySelector(propsEl);
  let props = {};
  if(propsJson) {
    props = JSON.parse(propsJson);
  }
  return props;
}