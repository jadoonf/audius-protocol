package peering

import (
	"fmt"
	"strings"
	"time"

	"comms.audius.co/discovery/config"
)

type Info struct {
	Host string
	SPID string

	Address         string
	Nkey            string
	IP              string
	NatsClusterName string
	NatsRoute       string
	// todo: public key for shared secret stuff?

	IsSelf          bool
	NatsIsReachable bool
	AsOf            time.Time
}

func MyInfo() (*Info, error) {
	info := &Info{
		Address:         config.WalletAddress,
		Nkey:            config.NkeyPublic,
		IP:              config.IP,
		NatsClusterName: config.NatsClusterName,
		NatsRoute:       fmt.Sprintf("nats://%s:%s@%s:6222", config.NatsClusterUsername, config.NatsClusterPassword, config.IP),
		NatsIsReachable: config.NatsIsReachable,
	}
	return info, nil
}

func WalletEquals(a, b string) bool {
	return strings.EqualFold(a, b)
}
