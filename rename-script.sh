#!/bin/bash

# --- Script para padronizar nomes de arquivos e pastas ---
# REGRAS:
# 1. Tudo em minúsculas.
# 2. Espaços viram hífens (-).
# 3. Remove caracteres especiais (exceto . e -).

echo "Iniciando a padronização de nomes de arquivos..."

# O comando 'find . -depth' lista todos os arquivos e pastas,
# processando o conteúdo dos diretórios antes dos próprios diretórios.
# Isso evita erros ao renomear pastas que contêm arquivos.
find . -depth -name '*' | while read path; do

    # Ignora o diretório .git e o próprio script para não causar problemas
    if [[ "$path" == *".git"* ]] || [[ "$path" == *"rename-script.sh"* ]]; then
        continue
    fi

    # Separa o diretório do nome do arquivo/pasta
    DIR=$(dirname "$path")
    OLD_NAME=$(basename "$path")

    # Cria o novo nome padronizado
    # 1. Converte para minúsculas
    # 2. Substitui espaços e underscores por hífens
    # 3. Remove todos os caracteres que NÃO são letras (a-z), números (0-9), ponto (.) ou hífen (-)
    NEW_NAME=$(echo "$OLD_NAME" | tr '[:upper:]' '[:lower:]' | sed -e 's/[_ ]/-/g' | sed -e 's/[^a-z0-9.-]//g')

    # Se o nome antigo for diferente do novo, renomeia
    if [ "$OLD_NAME" != "$NEW_NAME" ]; then
        # O comando 'mv' renomeia o arquivo ou pasta
        mv -n "$path" "$DIR/$NEW_NAME"
        echo "Renomeado: '$OLD_NAME' -> '$NEW_NAME'"
    fi
done

echo "Padronização concluída!"

