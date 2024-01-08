export default function stripHtml(text){
  return text.replace(/<a[^>]*><\/a>/g, '');
}
