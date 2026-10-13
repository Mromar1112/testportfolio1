<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep editable verified portfolio content in src/lib/portfolio-data.ts and presentation in focused React components so missing URLs cannot become fabricated links.
- Use the index route as an explicitly requested long-scroll portfolio with accessible project dialogs and anchor navigation.
- Contact submissions use a shared Zod schema and a public write-only server function; private enquiries remain inaccessible to browser reads.
- Keep all visual roles and responsive styling in the global token-based design system; native CSS and IntersectionObserver provide reduced-motion-aware animation.
