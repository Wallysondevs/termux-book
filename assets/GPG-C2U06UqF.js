import{j as e}from"./index-d-w5ROEn.js";import{P as r}from"./PageContainer-t8f2nTRw.js";import{T as s,C as a,F as t,O as i}from"./Terminal-B39pZIiO.js";import{I as o}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function d(){return e.jsxs(r,{title:"GPG — criptografia e assinaturas",subtitle:"Gerar chaves, criptografar, descriptografar, assinar, verificar e usar GPG para assinar commits Git e pacotes APT.",difficulty:"avancado",timeToRead:"30 min",category:"Segurança",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"GPG"})," (GNU Privacy Guard) é a implementação livre do padrão OpenPGP (RFC 4880). Cobre dois mundos: ",e.jsx("em",{children:"criptografia assimétrica"})," (chave pública para cifrar, privada para decifrar) e ",e.jsx("em",{children:"assinatura digital"})," (privada assina, pública verifica). É a tecnologia por trás dos repositórios APT assinados, do ",e.jsx("code",{children:"git commit --gpg-sign"}),", das verificações de integridade dos ISOs do Termux, etc."]}),e.jsx(s,{title:"wallyson@termux: ~",children:e.jsx(a,{command:"gpg --version",output:`gpg (GnuPG) 2.4.4
libgcrypt 1.10.3
Copyright (C) 2024 g10 Code GmbH
License GNU GPL-3.0-or-later <https://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Home: /home/wallyson/.gnupg
Supported algorithms:
Pubkey: RSA, ELG, DSA, ECDH, ECDSA, EDDSA
Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH,
        CAMELLIA128, CAMELLIA192, CAMELLIA256
Hash: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
Compression: Uncompressed, ZIP, ZLIB, BZIP2`})}),e.jsx("h2",{children:"1. Gerar um par de chaves"}),e.jsxs("p",{children:["Em 2025, escolha ",e.jsx("strong",{children:"ECC Curve 25519 (ed25519)"})," — chaves pequenas (256 bits), rápidas, fortes. Use RSA 4096 só por compatibilidade com sistemas antigos."]}),e.jsx(s,{title:"wallyson@termux: ~",children:e.jsx(a,{command:"gpg --full-generate-key --expert",output:`gpg (GnuPG) 2.4.4; Copyright (C) 2024 g10 Code GmbH

Please select what kind of key you want:
   (1) RSA and RSA
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
   (7) DSA (set your own capabilities)
   (8) RSA (set your own capabilities)
   (9) ECC (sign and encrypt) *default*
  (10) ECC (sign only)
  (11) ECC (set your own capabilities)
  (13) Existing key
  (14) Existing key from card
Your selection? 9

Please select which elliptic curve you want:
   (1) Curve 25519 *default*
   (3) NIST P-256
   (4) NIST P-384
   (5) NIST P-521
   (6) Brainpool P-256
   (7) Brainpool P-384
   (8) Brainpool P-512
   (9) secp256k1
Your selection? 1

Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 2y
Key expires at Sat 12 Nov 2027 09:32:11 BRT
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: Wallyson Silva
Email address: wallyson@exemplo.com
Comment: Chave pessoal
You selected this USER-ID:
    "Wallyson Silva (Chave pessoal) <wallyson@exemplo.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
We need to generate a lot of random bytes...
gpg: directory '/home/wallyson/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/home/wallyson/.gnupg/openpgp-revocs.d/9F2A1E72C4B5...rev'
public and secret key created and signed.

pub   ed25519 2025-11-12 [SC] [expires: 2027-11-12]
      9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890
uid                      Wallyson Silva (Chave pessoal) <wallyson@exemplo.com>
sub   cv25519 2025-11-12 [E] [expires: 2027-11-12]`})}),e.jsxs(o,{type:"info",title:"Capabilities das subkeys",children:[e.jsx("code",{children:"[SC]"})," = Sign + Certify (chave principal). ",e.jsx("code",{children:"[E]"})," = Encrypt. Boa prática: a primária só certifica/assina; criar subkeys separadas para cifrar e para assinar. Assim, se uma subkey vazar, você revoga só ela sem perder a identidade."]}),e.jsx("h2",{children:"2. Listar e inspecionar chaves"}),e.jsxs(s,{title:"wallyson@termux: ~",children:[e.jsx(a,{command:"gpg --list-keys",output:`/home/wallyson/.gnupg/pubring.kbx
--------------------------------
pub   ed25519 2025-11-12 [SC] [expires: 2027-11-12]
      9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890
uid           [ultimate] Wallyson Silva (Chave pessoal) <wallyson@exemplo.com>
sub   cv25519 2025-11-12 [E] [expires: 2027-11-12]`}),e.jsx(a,{command:"gpg --list-secret-keys --keyid-format=long",output:`sec   ed25519/A3B4C5D6E7F89012 2025-11-12 [SC] [expires: 2027-11-12]
      9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890
uid                 [ultimate] Wallyson Silva (Chave pessoal) <wallyson@exemplo.com>
ssb   cv25519/D7E89A0B1C2D3E4F 2025-11-12 [E] [expires: 2027-11-12]`}),e.jsx(a,{command:"gpg --fingerprint",output:`pub   ed25519 2025-11-12 [SC] [expires: 2027-11-12]
      9F2A 1E72 C4B5 D8E9 1A3B  4C5D 6E7F 8901 2345 6789
uid           [ultimate] Wallyson Silva (Chave pessoal) <wallyson@exemplo.com>
sub   cv25519 2025-11-12 [E] [expires: 2027-11-12]`})]}),e.jsx("h2",{children:"3. Exportar / importar chaves"}),e.jsxs(s,{title:"wallyson@termux: ~",children:[e.jsx(a,{command:"gpg --export --armor wallyson@exemplo.com > wallyson.pub.asc",comment:"Sua chave pública (compartilhável)"}),e.jsx(a,{command:"head -3 wallyson.pub.asc",output:`-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZzKjGxYJKwYBBAHaRw8BAQdAVx2lIm9...`}),e.jsx(a,{command:"gpg --export-secret-keys --armor wallyson@exemplo.com > wallyson.secret.asc",comment:"Sua chave PRIVADA — backup ultra-secreto, nunca publique"}),e.jsx(a,{command:"gpg --export-secret-subkeys --armor > subkeys.asc",comment:"Só subkeys (sem a primária) — perfeito para máquinas remotas"}),e.jsx(a,{command:"gpg --import maria.pub.asc",output:`gpg: key A1B2C3D4E5F60718: public key "Maria Silva <maria@exemplo.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1`}),e.jsx(a,{command:"gpg --edit-key maria@exemplo.com",comment:"Para confiar/assinar a chave dela",output:`gpg> trust
Please decide how far you trust this user to correctly verify other users' keys
  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu
Your decision? 4
gpg> sign
gpg> save`})]}),e.jsx("h2",{children:"4. Criptografar / descriptografar"}),e.jsxs(s,{title:"wallyson@termux: ~",children:[e.jsx(a,{command:"echo 'segredo importante' > mensagem.txt"}),e.jsx(a,{command:"gpg --encrypt --armor --recipient maria@exemplo.com mensagem.txt",comment:"Gera mensagem.txt.asc — só Maria pode decifrar"}),e.jsx(a,{command:"cat mensagem.txt.asc",output:`-----BEGIN PGP MESSAGE-----

hQGMA1nQz7p4xrQfAQwAv5MtGXqEZWJlXQNuKdAi9p3vRcDfZ2k4G7+1uMs8WzZK
LYBjMOQa+NRlV3CMPx4+gE3uVc2FZlmnVQRvNlNLMGCZtFY3tj4HsXG5Zb6hCwVU
=H7nJ
-----END PGP MESSAGE-----`}),e.jsx(a,{command:"gpg --decrypt mensagem.txt.asc",output:`gpg: encrypted with cv25519 key, ID 8F1C..., created 2025-09-12
      "Maria Silva <maria@exemplo.com>"
segredo importante`}),e.jsx(a,{command:"gpg --symmetric --cipher-algo AES256 nota.txt",comment:"Cifra com SENHA (sem chave pública) — útil para backup pessoal",output:`Enter passphrase: ********
Repeat passphrase: ********`}),e.jsx(a,{command:"gpg --output nota.txt --decrypt nota.txt.gpg",comment:"Pede a senha e gera nota.txt"})]}),e.jsx("h2",{children:"5. Assinar e verificar"}),e.jsxs(s,{title:"wallyson@termux: ~",children:[e.jsx(a,{command:"gpg --sign documento.pdf",comment:"Cria documento.pdf.gpg (binário, com assinatura + conteúdo)"}),e.jsx(a,{command:"gpg --clearsign artigo.txt",comment:"Assinatura legível dentro do mesmo arquivo (ASCII)"}),e.jsx(a,{command:"cat artigo.txt.asc",output:`-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

Este artigo foi escrito por Wallyson Silva em 12/11/2025.
Conteúdo original do texto...
-----BEGIN PGP SIGNATURE-----

iQEzBAEBCgAdFiEE...
=8aBz
-----END PGP SIGNATURE-----`}),e.jsx(a,{command:"gpg --detach-sign --armor termux-24.04.iso",comment:"Gera termux-24.04.iso.asc — assinatura SEPARADA"}),e.jsx(a,{command:"gpg --verify termux-24.04.iso.asc termux-24.04.iso",output:`gpg: Signature made Tue 12 Nov 2025 09:54:11 BRT
gpg:                using EDDSA key 9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890
gpg: Good signature from "Wallyson Silva (Chave pessoal) <wallyson@exemplo.com>" [ultimate]`})]}),e.jsx("h2",{children:"6. Keyservers — distribuir e baixar chaves"}),e.jsxs(s,{title:"wallyson@termux: ~",children:[e.jsx(a,{command:"gpg --keyserver hkps://keys.openpgp.org --send-keys 9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890",output:"gpg: sending key 6E7F890123456789 to hkps://keys.openpgp.org"}),e.jsx(a,{command:"gpg --keyserver hkps://keys.openpgp.org --search-keys maria@exemplo.com",output:`gpg: data source: https://keys.openpgp.org:443
(1)     Maria Silva <maria@exemplo.com>
          4096 bit RSA key A1B2C3D4E5F60718, created: 2024-03-15
Keys 1-1 of 1 for "maria@exemplo.com".  Enter number(s), N)ext, or Q)uit > 1`}),e.jsx(a,{command:"gpg --keyserver hkps://keys.openpgp.org --recv-keys A1B2C3D4E5F60718",output:`gpg: key A1B2C3D4E5F60718: public key "Maria Silva <maria@exemplo.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1`}),e.jsx(a,{command:"gpg --refresh-keys",comment:"Atualiza todas as chaves importadas (revogações, novas subkeys)"})]}),e.jsx("h2",{children:"7. Backup e revogação"}),e.jsxs(s,{title:"wallyson@termux: ~",children:[e.jsx(a,{command:"ls ~/.gnupg/openpgp-revocs.d/",output:"9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890.rev"}),e.jsx(a,{command:"cat ~/.gnupg/openpgp-revocs.d/9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890.rev | head -5",output:`This is a revocation certificate for the OpenPGP key:

pub   ed25519 2025-11-12 [SC] [expires: 2027-11-12]
      9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890
uid          Wallyson Silva (Chave pessoal) <wallyson@exemplo.com>`}),e.jsx(a,{command:"tar czvf gpg-backup-$(date +%F).tar.gz -C ~ .gnupg",comment:"Backup do diretório inteiro (incluindo trustdb e revocs)",output:`.gnupg/
.gnupg/openpgp-revocs.d/
.gnupg/openpgp-revocs.d/9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890.rev
.gnupg/private-keys-v1.d/
.gnupg/private-keys-v1.d/D7E89A0B1C2D3E4F....key
.gnupg/pubring.kbx
.gnupg/trustdb.gpg`}),e.jsx(a,{command:"gpg --import ~/.gnupg/openpgp-revocs.d/9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890.rev",comment:"EM CASO DE COMPROMETIMENTO: importa a revogação"}),e.jsx(a,{command:"gpg --keyserver hkps://keys.openpgp.org --send-keys 9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890",comment:"Publica a revogação"})]}),e.jsxs(o,{type:"danger",title:"Cofre offline para a primária",children:["Em uso pesado: gere a chave PRIMÁRIA em uma máquina ",e.jsx("em",{children:"airgapped"})," (Live USB sem rede), exporte só as ",e.jsx("em",{children:"subkeys"})," para a máquina do dia-a-dia. Se a sua máquina for invadida, o atacante não tem a primária — você revoga as subkeys e cria novas."]}),e.jsx("h2",{children:"8. GPG agent e cache de senha"}),e.jsx(t,{path:"~/.gnupg/gpg-agent.conf",children:`default-cache-ttl 3600           # 1h sem digitar senha
max-cache-ttl 28800              # máximo 8h
pinentry-program /usr/bin/pinentry-gnome3
allow-loopback-pinentry
enable-ssh-support`}),e.jsxs(s,{title:"wallyson@termux: ~",children:[e.jsx(a,{command:"gpgconf --kill gpg-agent",comment:"Reinicia o agent"}),e.jsx(a,{command:"gpg-connect-agent reloadagent /bye",output:"OK"}),e.jsx(a,{command:"ssh-add -L",comment:"GPG agent pode atuar como ssh-agent",output:"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEr2Y3..."})]}),e.jsx("h2",{children:"9. Integração com Git"}),e.jsxs(s,{title:"wallyson@termux: ~",children:[e.jsx(a,{command:"git config --global user.signingkey 9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890"}),e.jsx(a,{command:"git config --global commit.gpgsign true"}),e.jsx(a,{command:"git config --global tag.gpgSign true"}),e.jsx(a,{command:"git commit -S -m 'feat: assinatura habilitada'",output:`[main 8a3f211] feat: assinatura habilitada
 Author: Wallyson Silva <wallyson@exemplo.com>
 1 file changed, 2 insertions(+)`}),e.jsx(a,{command:"git log --show-signature -1",output:`commit 8a3f211abc4d... (HEAD -> main)
gpg: Signature made Tue 12 Nov 2025 10:14:22 BRT
gpg:                using EDDSA key 9F2A1E72C4B5D8E91A3B4C5D6E7F8901234567890
gpg: Good signature from "Wallyson Silva <wallyson@exemplo.com>" [ultimate]
Author: Wallyson Silva <wallyson@exemplo.com>
Date:   Tue Nov 12 10:14:22 2025 -0300

    feat: assinatura habilitada`})]}),e.jsx("h2",{children:"10. APT signed-by — repositórios assinados"}),e.jsxs("p",{children:["O método moderno de adicionar repositórios externos (PPAs ou de terceiros) usa keyrings dedicados em ",e.jsx("code",{children:"/etc/apt/keyrings/"}),", evitando o antigo",e.jsx("code",{children:"apt-key"})," (depreciado)."]}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"install -m 0755 -d /etc/apt/keyrings"}),e.jsx(a,{root:!0,command:"curl -fsSL https://download.docker.com/linux/termux/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg"}),e.jsx(a,{root:!0,command:"chmod a+r /etc/apt/keyrings/docker.gpg"}),e.jsx(a,{root:!0,command:'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/termux $(. /etc/os-release && echo $VERSION_CODENAME) stable" | tee /etc/apt/sources.list.d/docker.list'}),e.jsx(a,{root:!0,command:"pkg update",output:`Hit:1 https://download.docker.com/linux/termux noble InRelease
Reading package lists... Done`})]}),e.jsx(i,{children:`Resumo dos comandos GPG mais usados:

  gpg --full-generate-key                gerar par
  gpg --list-keys / --list-secret-keys   listar
  gpg --export --armor EMAIL             exportar pública
  gpg --import arquivo.asc               importar
  gpg --encrypt -r EMAIL arq             cifrar
  gpg --decrypt arq.gpg                  decifrar
  gpg --sign / --clearsign / --detach-sign  assinar
  gpg --verify arq.sig arq               verificar
  gpg --edit-key EMAIL                   trust/sign/expire
  gpg --send-keys / --recv-keys          keyservers
  gpg --refresh-keys                     atualizar tudo`})]})}export{d as default};
