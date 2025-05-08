-- CreateTable
CREATE TABLE "Estudante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estudante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simulacao" (
    "id" SERIAL NOT NULL,
    "id_estudante" INTEGER NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "quantidade_parcelas" INTEGER NOT NULL,
    "juros_ao_mes" DOUBLE PRECISION NOT NULL,
    "valor_parcela_mensal" DOUBLE PRECISION NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Simulacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_email_key" ON "Estudante"("email");

-- AddForeignKey
ALTER TABLE "Simulacao" ADD CONSTRAINT "Simulacao_id_estudante_fkey" FOREIGN KEY ("id_estudante") REFERENCES "Estudante"("id") ON DELETE CASCADE ON UPDATE CASCADE;
