"use client";

import { DetallesItemBody } from "@/components/pages/inventario/body/detallesItemBody";

export default function DetallesItem({
  params,
}: {
  params: { itemInventario: string };
}) {
  return <DetallesItemBody itemInventario={params.itemInventario} />;
}
