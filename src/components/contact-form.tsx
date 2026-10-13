import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactSchema } from '@/lib/contact-schema';
import { submitContact } from '@/lib/contact.functions';
export function ContactForm() {
 const send = useServerFn(submitContact);
 const [errors,setErrors] = useState<Record<string,string>>({});
 const [loading,setLoading] = useState(false);
 const [status,setStatus] = useState<{ok:boolean;message:string}|null>(null);
 async function submit(e:FormEvent<HTMLFormElement>) {
  e.preventDefault(); setStatus(null);
  const form=e.currentTarget; const parsed=contactSchema.safeParse(Object.fromEntries(new FormData(form)));
  if(!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map(i=>[String(i.path[0]),i.message]))); return; }
  setErrors({});setLoading(true);
  try { const result=await send({data:parsed.data}); setStatus(result); if(result.ok) form.reset(); }
  catch { setStatus({ok:false,message:'Unable to save your message. Please email mukkaomar@gmail.com instead.'}); }
  finally { setLoading(false); }
 }
 return <form onSubmit={submit} noValidate><div className="form-grid">
  {[{name:'name',label:'Your name',placeholder:'Alex Morgan',max:100},{name:'email',label:'Email address',placeholder:'alex@company.com',max:255},{name:'subject',label:'Subject',placeholder:'Let’s build something together',max:150}].map(f=><div key={f.name} className={`form-field ${f.name==='subject'?'full':''}`}><label htmlFor={`contact-${f.name}`}>{f.label}</label><input required id={`contact-${f.name}`} name={f.name} type={f.name==='email'?'email':'text'} autoComplete={f.name==='subject'?'off':f.name} maxLength={f.max} placeholder={f.placeholder} aria-invalid={Boolean(errors[f.name])} aria-describedby={errors[f.name]?`${f.name}-error`:undefined}/>{errors[f.name]&&<span className="form-error" id={`${f.name}-error`}>{errors[f.name]}</span>}</div>)}
  <div className="form-field full"><label htmlFor="contact-message">Your message</label><textarea required id="contact-message" name="message" maxLength={3000} placeholder="Tell me a little about what you have in mind…" aria-invalid={Boolean(errors['message'])} aria-describedby={errors['message']?'message-error':undefined}/>{errors['message']&&<span className="form-error" id="message-error">{errors['message']}</span>}</div>
  <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
  <Button className="full min-h-11 w-fit" disabled={loading} type="submit">{loading?<><Loader2 className="animate-spin"/>Sending…</>:<>Send Message <ArrowUpRight/></>}</Button>
 </div><div aria-live="polite">{status&&<p className={`form-status ${status.ok?'':'failure'}`}>{status.message}</p>}</div></form>;
}
