const showSkattAlert = (ytelse:string) => {
  return ytelse.toLowerCase() === "arbeidsavklaringspenger" || ytelse.toLowerCase() === "dagpenger"
}

export default showSkattAlert;