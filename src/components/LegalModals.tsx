'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LegalDocTab, onOpenLegalModal } from '@/components/legalConsent';
import { LegalDocumentData, PRIVACY_POLICY, TERMS_OF_SERVICE, TextSegment } from '@/components/legalContent';

function renderSegments(segments: TextSegment[]) {
  return segments.map((seg, idx) => {
    if (seg.link) {
      return (
        <a
          key={idx}
          href={seg.link.href}
          target={seg.link.external ? '_blank' : undefined}
          rel={seg.link.external ? 'noopener noreferrer' : undefined}
          className="text-arcade-coin underline underline-offset-4 hover:text-[#FFE600] break-all transition-colors"
        >
          {seg.text}
        </a>
      );
    }
    if (seg.bold) {
      return (
        <strong key={idx} className="font-semibold text-white">
          {seg.text}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{seg.text}</React.Fragment>;
  });
}

function LegalDocumentBody({ doc }: { doc: LegalDocumentData }) {
  return (
    <div className="space-y-6">
      <div className="border-b-2 border-border pb-4">
        <h2 id="legal-modal-title" className="font-pixel text-sm sm:text-base text-foreground uppercase leading-relaxed">
          {doc.title}
        </h2>
        <p className="font-terminal text-lg text-arcade-green mt-2 leading-snug">{doc.meta}</p>
      </div>

      {doc.sections.map((section) => (
        <section key={section.heading} className="space-y-2.5">
          <h3 className="font-pixel text-[11px] sm:text-xs text-arcade-coin leading-relaxed">
            {section.heading}
          </h3>
          {section.paragraphs?.map((para, pIdx) => (
            <p key={pIdx} className="text-sm sm:text-[15px] text-[#F8F7F2]/90 leading-relaxed">
              {renderSegments(para)}
            </p>
          ))}
          {section.bullets && (
            <ul className="space-y-2 pl-1">
              {section.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#F8F7F2]/90 leading-relaxed">
                  <span className="text-arcade-coin font-terminal text-lg leading-none mt-1 flex-shrink-0" aria-hidden="true">
                    ▸
                  </span>
                  <span>
                    {bullet.label && (
                      <strong className="font-semibold text-white">{bullet.label}: </strong>
                    )}
                    {renderSegments(bullet.segments)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

export default function LegalModals() {
  const [activeTab, setActiveTab] = useState<LegalDocTab | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setActiveTab(null);
  }, []);

  useEffect(() => {
    return onOpenLegalModal((tab) => setActiveTab(tab));
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeTab !== null) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeTab]);

  const activeDoc = activeTab === 'terms' ? TERMS_OF_SERVICE : PRIVACY_POLICY;
  const switchTab = (next: LegalDocTab) => {
    setActiveTab(next);
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="legal-modal-title"
      aria-modal="true"
      className="legal-dialog text-foreground"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      {activeTab !== null && (
        <div className="bg-[#0A0B0E] border-2 border-arcade-coin shadow-[8px_8px_0_0_#000] flex flex-col max-h-[94dvh]">
          {/* Modal Header */}
          <div className="bg-[#14171F] border-b-2 border-arcade-coin px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3" role="tablist" aria-label="Legal documents">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'privacy'}
                onClick={() => switchTab('privacy')}
                className={`font-pixel text-[9px] sm:text-[10px] px-3 py-1.5 border-2 transition-colors cursor-pointer ${
                  activeTab === 'privacy'
                    ? 'bg-arcade-coin text-arcade-ink border-arcade-ink font-bold'
                    : 'bg-transparent text-muted-foreground border-border hover:border-arcade-coin hover:text-arcade-coin'
                }`}
              >
                {PRIVACY_POLICY.headerTag}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'terms'}
                onClick={() => switchTab('terms')}
                className={`font-pixel text-[9px] sm:text-[10px] px-3 py-1.5 border-2 transition-colors cursor-pointer ${
                  activeTab === 'terms'
                    ? 'bg-arcade-coin text-arcade-ink border-arcade-ink font-bold'
                    : 'bg-transparent text-muted-foreground border-border hover:border-arcade-coin hover:text-arcade-coin'
                }`}
              >
                {TERMS_OF_SERVICE.headerTag}
              </button>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close legal modal"
              className="font-pixel text-[9px] sm:text-[10px] bg-arcade-ink text-arcade-coin border-2 border-arcade-coin px-3 py-1.5 hover:bg-arcade-coin hover:text-arcade-ink transition-colors cursor-pointer"
            >
              [ CLOSE ]
            </button>
          </div>

          {/* Scrollable Body */}
          <div
            ref={bodyRef}
            className="flex-1 min-h-0 max-h-[80vh] overflow-y-auto overscroll-contain p-5 sm:p-7"
          >
            <LegalDocumentBody doc={activeDoc} />
          </div>

          {/* Modal Footer Switcher */}
          <div className="bg-[#14171F] border-t-2 border-border px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <span className="font-terminal text-base text-muted-foreground">
              {activeDoc.headerTag} · POPIA &amp; ECT ACT ALIGNED
            </span>
            <button
              type="button"
              onClick={() => switchTab(activeTab === 'privacy' ? 'terms' : 'privacy')}
              className="font-pixel text-[9px] text-arcade-coin hover:text-[#FFE600] underline underline-offset-4 cursor-pointer"
            >
              {activeTab === 'privacy' ? 'View Terms of Service →' : '← View Privacy Policy'}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
