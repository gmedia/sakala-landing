# Sakala Landing Motion Language

> **Nothing moves unless something is becoming.**  
> **Only one thing becomes at a time.**

## 1. Why motion exists

Motion on Sakala is not a decoration layer.

It communicates:

```text
change
progress
relationship
emergence
growth
```

If an animation cannot be described with a meaningful state-change verb, remove it.

## 2. Motion vocabulary

### Reveal

Meaning:

> Information becomes available.

Use for a result or supporting detail becoming available.

Do not animate every heading merely because it enters the viewport.

### Transform

Meaning:

> The same thing becomes another form.

Signature use:

```text
source
→ live application
```

### Progress

Meaning:

> A process advances through known states.

Use for:

```text
Analyze
Build
Start
Health
Reach
```

### Connect

Meaning:

> Two objects gain a relationship.

Use for project → showcase, project → creator, or template → derived project.

### Emerge

Meaning:

> Something becomes present.

Use for public URL, live browser, or healthy state.

### Grow

Meaning:

> A living artifact produces continuation.

Use for:

```text
Live App
→ Showcase
→ Template
→ New Project
```

## 3. Signature sequence

The main motion investment should be:

# **Source → Sakala → Presence**

Conceptual sequence:

```text
repository/file tree
       ↓
Sakala threshold
       ↓
analyze
       ↓
build
       ↓
start
       ↓
health
       ↓
public URL
       ↓
browser/live artifact
```

This sequence must be understandable if motion is disabled.

## 4. One thing at a time

Do not animate headline, background, line, card, browser, and decorations simultaneously.

Prefer:

```text
headline rests
artifact transforms

artifact rests
deployment progresses

deployment rests
browser emerges

browser rests
lineage grows
```

## 5. Scroll behavior

Scroll belongs to the visitor.

Do not:

- lock scrolling for long cinematic sequences;
- require multiple wheel gestures to exit a chapter;
- hide content behind mandatory animation;
- create horizontal scroll journeys for ordinary content.

A short sticky/pinned transformation may be considered only for the signature manifestation moment.

Recommended conceptual maximum:

```text
~1 to 1.5 viewport of scroll-linked transformation
```

Then return to normal document flow.

## 6. Scroll-triggered vs scroll-linked

Prefer simple scroll-triggered state changes for most content.

Use scroll-linked animation only when the scroll position itself helps explain a transformation.

Do not use a heavy motion framework merely because it is convenient.

Native CSS, IntersectionObserver, and platform primitives are preferred when sufficient.

## 7. Duration and easing

Motion should feel precise.

- small UI feedback: short;
- state transitions: moderate;
- signature transformation: slower only when comprehension benefits;
- avoid floaty elastic easing for infrastructure states.

Test interaction in context.

## 8. Reduced motion

`prefers-reduced-motion` is mandatory.

Reduced-motion mode must:

- remove scroll-linked transforms;
- avoid large spatial movement;
- show final states without loss of information;
- preserve deployment ordering through static layout/text;
- preserve Green Line relationships without animated drawing.

The story must work with **zero motion**.

## 9. Performance

Avoid:

- large client frameworks;
- decorative WebGL;
- video backgrounds;
- giant Lottie payloads;
- continuous animation loops;
- layout-thrashing JS on scroll.

Prefer compositor-friendly properties where possible.

Measure before adding complexity.

## 10. Accessibility

Never encode status only through motion or color.

A deployment step still needs:

```text
label
state text/icon
logical order
```

## 11. Motion review questions

For every animation ask:

1. What changed?
2. Why should the visitor notice?
3. Is motion the clearest way to communicate it?
4. Does the page still work without it?
5. Is only one primary thing demanding attention?
6. Is the implementation worth its runtime cost?

If answers are weak, use a static transition.
