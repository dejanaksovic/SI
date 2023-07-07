export const getRepresentDate = (string) => {
   const asDate = new Date(string)
   return `${asDate.getDay()}. ${asDate.getDate()}. ${asDate.getFullYear()}.`
}