import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/contact-schema';
import { personalLinks, projects } from '@/lib/portfolio-data';
const valid={name:'Alex',email:'alex@example.com',subject:'Opportunity',message:'Let’s discuss a software role.',website:''};
describe('Contact validation',()=>{
 it('accepts a valid enquiry',()=>expect(contactSchema.safeParse(valid).success).toBe(true));
 it('rejects an invalid email',()=>expect(contactSchema.safeParse({...valid,email:'invalid'}).success).toBe(false));
 it('rejects blank required fields',()=>{for(const name of ['name','subject','message'])expect(contactSchema.safeParse({...valid,[name]:' '}).success).toBe(false);});
 it('rejects automated honeypot submissions',()=>expect(contactSchema.safeParse({...valid,website:'spam'}).success).toBe(false));
});
describe('Portfolio accuracy',()=>{
 it('does not offer a missing resume or invented profile URLs',()=>expect(personalLinks).toEqual({resume:null,github:null,linkedin:null}));
 it('uses the supplied water-monitor technologies',()=>expect(projects[2].tags).toEqual(['ESP8266','Blynk','IoT']));
});
