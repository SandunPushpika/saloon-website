'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '@/constants/faq'

export function FAQAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
      {faqItems.map((item) => (
        <Accordion.Item key={item.id} value={item.id} className="rounded-xl bg-white shadow-sm">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-4 text-left font-sans text-sm font-medium text-charcoal">
              {item.question}
              <ChevronDown
                className="shrink-0 text-rose-gold transition-transform group-data-[state=open]:rotate-180"
                size={18}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-6 pb-4 font-sans text-sm text-charcoal/70">
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
