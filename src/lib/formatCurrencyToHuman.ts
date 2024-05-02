const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export default (value: number) => usdFormatter.format(value)